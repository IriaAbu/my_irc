import React, { useState, useRef } from 'react'
import styled from "styled-components"
import io from "socket.io-client"

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background: url(./style/wallpaper.jpeg);
  background-size: cover;
  flex-direction: column;
  color: #d0a769;
`

const ButtonCommuneute = styled.button`
  color: #e4d7a0;
  background-color: #7f3e28c0;
  border: 1px solid #e4d7a0;
  text-shadow: 0 0 10px #621616;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 1px;
  
  &:hover {
    cursor: pointer;
    color: #7f3e28c0;
    background-color: #e4d7a0;
    border: 1px solid #7f3e28c0;
  }
`

const Communeute = styled.div`
  color: #e4d7a0;
  padding: 0;
  background-color: #7f3e28e5;
  text-shadow: 0 0 10px #621616;
  border-radius: 10px;
  text-align: center;
`

const IDListeCompagnons = styled.p`
  display: inline-block; 
  color: #621616;
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 0 10px #e4d7a0;
  padding: 0px 5px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  background-color: #7f3e28;
  border: 1px solid #e4d7a0;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
  opacity: 97%;
`

const AutoInfos = styled.div`
  width: 90%;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 5px;
  font-size: 15px;
  background-color: transparent;
  color: #e4d7a0;
  letter-spacing: 1px;
  line-height: 20px;
`

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: #7f3e28;
  border: 1px solid #e4d7a0;
  outline: none;
  color: #e4d7a0;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: #e4d7a0;
  }
`

const InputName = styled.input`
  width: 30%;
  height: 20px;
  border-radius: 10px;
  margin-top: 5px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: #7f3e28;
  border: 1px solid #e4d7a0;
  outline: none;
  color: #e4d7a0;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: #e4d7a0;
  }
`

const Button = styled.button`
  background: url(./style/portesDurin.jpg);
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: orange;
  font-weight: bold;
  font-size: 23px;
  text-align: left;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
  }
`

const Form = styled.form`
  width: 400px;
`

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const MyName = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: 10px;
`

const MyMessage = styled.div`
  width: 100%;
  background-color: #d0a769;
  color: #621616;
  padding: 10px;
  margin-right: 5px;
  text-align: left;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`

const PartnerName = styled(MyName)`
  justify-content: flex-start;
  margin-left: 10px;
`

const PartnerMessage = styled.div`
  width: 100%;
  background-color: transparent;
  color: #e4d7a0;
  border: 1px solid #d0a769;
  padding: 10px;
  margin-left: 5px;
  text-align: left;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

const App = () => {
  const [name, setName] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  let [allPeople, setAllPeople] = useState([])
  let [leavePeople, setLeavePeople] = useState([])
  const [hasName, setHasName] = useState(false)
  const [liste, setListe] = useState(false)

  const socketRef = useRef()

  function initialise() {
    socketRef.current = io.connect('/')

    socketRef.current.emit("hasName", name)

    socketRef.current.on("welcome", (users) => {
      setAllPeople(users)
    })

    socketRef.current.on("ciao", (deserter) => {
      setLeavePeople(deserter)
    })

    socketRef.current.on("your id", id => {
      console.log(id)
    })

    socketRef.current.on("message", (message) => {
      console.log("here")

      receivedMessage(message)
    })
  }

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message])
  }

  function sendMessage(e) {
    e.preventDefault()
    const messageObject = {
      body: message,
      id: name
    };
    setMessage("")
    socketRef.current.emit("send message", messageObject)
  }

  function handleChange(e) {
    setMessage(e.target.value)
  }

  function changeID(e) {
    e.preventDefault()
    setName(e.target.value)
    console.log(e.target.value)
  }

  function IfKeyDown(e) {
    if (e.key === 'Enter' && name !== "") {
      setHasName(true)
      initialise()
    }
  }

  function listeOn() {
    setListe(true)
  }

  function listeOf() {
    setListe(false)
  }

  if (hasName) {
    return (
      <Page>
        <h1 style={{ color: '#e4d7a0', textShadow: '0 0 10px #621616' }}>Le Chat du Milieu</h1>
        <ButtonCommuneute onClick={listeOn}>Afficher ma communeuté</ButtonCommuneute>
        {liste && allPeople.length === 0 &&
          <Communeute>
            <IDListeCompagnons>Aucun de nous ne doit se parler seul</IDListeCompagnons>
          </Communeute>
        }
        {liste === true && allPeople.length > 0 &&
          <Communeute>
            {allPeople.map((id) => {
              return (
                <IDListeCompagnons>
                  {id}
                </IDListeCompagnons>
              )
            })}
          </Communeute>
        }
        <Container onClick={listeOf}>
          <AutoInfos>
            Vous êtes dans la demeure d'Elrond.
          </AutoInfos>
          {allPeople.map((id, index) => {
            if (id !== name) {
              return (
                <AutoInfos key={index}>
                  Bienvenue à Fondcombe, {id}
                </AutoInfos>
              )
            }
          })
          }
          {leavePeople.map((id, index) => {
            if (id !== name) {
              return (
                <AutoInfos key={index}>
                  {id} a basculé dans l'ombre
                </AutoInfos>
              )
            }
          })
          }
          {messages.map((message, index) => {
            if (message.id === name) {
              return (
                <MyRow key={index}>
                  <MyName>moi</MyName>
                  <MyMessage>
                    {message.body}
                  </MyMessage>
                </MyRow>
              )
            }
            return (
              <PartnerRow key={index}>
                <PartnerMessage>
                  {message.body}
                </PartnerMessage>
                <PartnerName>{message.id}</PartnerName>
              </PartnerRow>
            )
          })}
        </Container>
        <Form onSubmit={sendMessage} onClick={listeOf}>
          <TextArea value={message} onChange={handleChange} placeholder="Parler ami et entrez !" />
          <Button>Envoyer le précieux</Button>
        </Form>
      </Page>
    )
  } else {
    return (
      <Page>
        <h1 style={{ color: '#e4d7a0', textShadow: '0 0 10px #621616' }}>Le Chat du Milieu</h1>
        <InputName value={name} onChange={changeID} onKeyDown={IfKeyDown} placeholder="Qui êtes-vous ?" ></InputName>
      </Page>
    )
  }

}

export default App