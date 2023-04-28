import React, { useEffect, useState } from 'react'
import { emojisData } from './EmojiData'
import './EmojiBg.scss'
import useMousePosition from '../helper/hooks/useMousePosition'

function rdm(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const EmojiItem = ({ pageX, pageY, text, fontSize, rotate }) => {
	return (
		<div
			className="logo"
			style={{
				left: pageX,
				top: pageY,
				fontSize: fontSize,
				// transform: `rotate(${rotate}deg) translate(-50%, 50%)`,
				transform: `translate(-50%, -50%)`,
			}}
		>
			{text}
		</div>
	)
}

const EmojiBg = () => {
	const mousePosition = useMousePosition()
	const [emojiArray, setEmojiArray] = useState([
		// {
		// 	text: '',
		// 	pageX: null,
		// 	pageY: null,
		// },
	])

	console.log(emojiArray)

	function becool() {
		let text = emojisData[rdm(0, emojisData.length - 1)]
		let pageX = mousePosition.x
		let pageY = mousePosition.y
		let fontSize = rdm(40, 160)
		let rotate = rdm(0, 360)
		setEmojiArray((pre) => [...pre, [text, pageX, pageY, fontSize, rotate]])
	}

	return (
		<div className="emoji-bg" onMouseMove={becool}>
			{emojiArray.map((value, index) => {
				return (
					<EmojiItem
						key={index}
						text={value[0]}
						pageX={value[1]}
						pageY={value[2]}
						fontSize={value[3]}
						rotate={value[4]}
					/>
				)
			})}
		</div>
	)
}

export default EmojiBg
