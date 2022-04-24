import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  VStack,
  StackDivider,
  IconButton,
  Flex,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

function UploadComponent({ onChange, maxFiles, suportedFormats }) {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    acceptedFiles => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    accept: suportedFormats,
  });

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  useEffect(() => {
    onChange(myFiles);
  }, [myFiles]);

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <div
        {...getRootProps({ className: 'dropzone', style: { ...baseStyle } })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {myFiles.map(file => (
          <Box key={file.path} h="auto" bg="gray.100">
            <Flex align="center" justify="space-between" m={2}>
              <Text m={2}>{file.path}</Text>
              <IconButton
                variant={'outline'}
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={removeFile(file)}
              />
            </Flex>
          </Box>
        ))}
      </VStack>

      {myFiles.length > 0 && <button onClick={removeAll}>Limpar</button>}
    </VStack>
  );
}

export default UploadComponent;
