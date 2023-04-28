import React, { useEffect, useState } from 'react'
import { emojisData } from './EmojiData'
import './EmojiBg.scss'
import useMousePosition from '../helper/hooks/useMousePosition'
import { motion, AnimatePresence } from 'framer-motion'
import uuid from 'react-uuid'

function rdm(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const EmojiItem = ({ pageX, pageY, text, fontSize, rotate }) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{ scale: 0 }}
				animate={{
					scale: 1,
				}}
				exit={{
					scale: 3,
				}}
				className="logo"
				style={{
					left: pageX,
					top: pageY,
					fontSize: fontSize,
					rotate: rotate,
					x: '-50%',
					y: '-50%',
				}}
			>
				{text}
			</motion.div>
		</AnimatePresence>
	)
}

const EmojiBg = () => {
	const mousePosition = useMousePosition()
	const [emojiArray, setEmojiArray] = useState([])
	const [move, setMove] = useState(0)

	function becool(e) {
		e.preventDefault()
		setMove((pre) => pre + 1)
		let text = emojisData[rdm(0, emojisData.length - 1)]
		let pageX = mousePosition.x
		let pageY = mousePosition.y
		let fontSize = rdm(40, 160)
		let rotate = rdm(0, 360)
		let id = uuid()

		if (move % 10 === 0) {
			setEmojiArray((pre) => [
				...pre,
				{
					text: text,
					pageX: pageX,
					pageY: pageY,
					fontSize: fontSize,
					rotate: rotate,
					id: id,
				},
			])
		}

		// if (emojiArray.length > 100) {
		// 	// const newItems = [...emojiArray]
		// 	// newItems.shift()
		// 	setEmojiArray((pre) => pre.slice(1))
		// 	// emojiArray.shift()
		// }
	}

	return (
		<div className="emoji-bg" onMouseMove={becool}>
			{emojiArray.map((value) => {
				return (
					<EmojiItem
						text={value.text}
						pageX={value.pageX}
						pageY={value.pageY}
						fontSize={value.fontSize}
						rotate={value.rotate}
						key={value.id}
					/>
				)
			})}
		</div>
	)
}

export default EmojiBg
