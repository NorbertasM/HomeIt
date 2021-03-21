import styled from 'styled-components'

export const Modal = styled.div`
z-index: 100;
position: fixed;
top: 5em;
left: 10%;
width: 80%;
background: white;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
border-radius: 8px;
text-align: center;
max-height: 80vh;
overflow: auto;
`

export const okButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
`