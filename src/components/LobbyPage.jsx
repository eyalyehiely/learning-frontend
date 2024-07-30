import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCodeBlocks from '../functions/codeBlocks/fetchAllCodeBlocks';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    getCodeBlocks(setCodeBlocks);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: 'white'
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Choose a Code Block
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {codeBlocks.map((codeBlock) => (
          <Card key={codeBlock.id} sx={{ width: 400, margin: '20px' }}>
            <Typography level="title-lg" sx={{ padding: 2 }}>
              {codeBlock.id}. {codeBlock.title}
            </Typography>
            <AspectRatio minHeight="120px" maxHeight="200px" sx={{ padding: 2 }}>
              <Box
                sx={{
                  maxHeight: '150px',
                  overflow: 'auto',
                  padding: 1,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              >
                <pre>
                  <code>{codeBlock.code}</code>
                </pre>
              </Box>
            </AspectRatio>
            <CardContent orientation="horizontal" sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <Button
                component={Link}
                to={`/codeblock/${codeBlock.id}`}
                variant="solid"
                size="md"
                color="primary"
                aria-label={`Explore ${codeBlock.title}`}
                sx={{ fontWeight: 600 }}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default LobbyPage;