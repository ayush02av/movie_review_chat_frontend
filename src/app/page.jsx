"use client"

import { useRef, useState, useEffect } from "react"
import io from 'socket.io-client'

export default function Home() {
	const [message, setMessage] = useState("")
	const messageContainer = useRef()
	const [socket, setSocket] = useState(null)

	function addMessageNode(message) {
		const messageNode = document.createElement("div")
		messageNode.innerText = message
		messageNode.className = "max-w-[50%] overflow-x-auto p-1 m-2"

		messageContainer.current.appendChild(messageNode)
		messageContainer.current.scrollTo(0, 0)
	}

	useEffect(() => {
		setSocket(io('https://moviereviewchatbackend-production.up.railway.app'))
	}, [])

	useEffect(() => {
		if (socket != null)
			socket.on('chat message', (message) => addMessageNode(message))
	}, [socket])

	function handleSubmit() {
		if (message == "")
			return
		socket.emit('chat message', message)
		addMessageNode(message)
		setMessage("")
	}

	return (
		<main>
			<div className="bg-gray-300 h-[90vh] w-[80%] mx-[10%] my-[5vh] rounded">
				<div className="h-[92%] w-[100%] overflow-y-scroll overflow-x-hidden" ref={messageContainer}></div>

				<div
					className="h-[8%] w-[100%] bg-gray-100"
				>
					<form
						className="h-[100%] w-[100%]"
						action={handleSubmit}
					>
						<input
							type="text"
							className="h-[100%] w-[90%] px-2 outline-none"
							autoFocus={true}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<input
							type="submit"
							value="submit"
							className="h-[100%] w-[10%] outline-none"
						/>
					</form>
				</div>
			</div>
		</main>
	)
}
