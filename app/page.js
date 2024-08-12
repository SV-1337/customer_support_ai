'use client'
import Image from "next/image"
import {useState} from 'react'
import {Box, Stack, TextField, Button} from '@mui/material'

export default function Home() {
  const [messages, setMessages] = useState([])
  const firstMessage = "Hi there! I'm the Headstarter Inn & Suites Assistant. How can I help you today?"

  const [message, setMessage] = useState('')

  const sendMessage = async() => {
    setMessages((messages) => [ ...messages, {role: "user", parts: [{text: message}]} ])
    setMessage('')

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify([ ...messages, {role: "user", parts: [{text: message}]} ])
    })

    const data = await response.json()
    setMessages((messages) => [ ...messages, {role: "model", parts: [{text: data}] }])
  }

  return (
    <Box 
      width="100vw"
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
      padding={5}
      bgcolor="#90ee90"
    >
      <Stack 
        direction="column" 
        width="800px" 
        height="600px" 
        border="1px solid black" 
        p={2} 
        spacing={3}
        borderRadius="20px"
        bgcolor="#d8f3dc"
      >
        <Stack 
          direction="column" 
          spacing={2} 
          flexGrow={1} 
          overflow="auto" 
          maxHeight="100%"
        >

          <Box
            width="85%"
            display={'flex'}
            justifyContent={'flex-start'}
            bgcolor={'#355e3b'}
            borderRadius={10}
            color={'white'}
            p={2}
          >
            {firstMessage}
          </Box>

          {
            messages.map((message, index) => (
              <Box key={index} display='flex' justifyContent={
                message.role === 'user' ? 'flex-end' : 'flex-start'
              }>
                <Box 
                  bgcolor=
                  {
                    message.role === 'user' ? '#4cbb17' : '#355e3b'
                  }
                  color="white"
                  borderRadius={16}
                  p={3}
                >
                  {message.parts[0].text}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="outlined" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>)
}
