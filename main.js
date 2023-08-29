const pen = {
	clear: () => {
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, 1, 1)
		ctx.fill()
	},
	rainbow_line: (ps) => {
		ctx.lineCap = 'square'
		ctx.fillStyle = 'white'

		ps.slice(1).forEach(({x, y}, i) => {
			ctx.strokeStyle = `hsl(${i * 360 / (ps.length-1)}, 100%, 50%)`
			ctx.beginPath()
			ctx.moveTo(ps[i].x, ps[i].y)
			ctx.lineTo(x, y)
			ctx.stroke()
		})
	}
}

///////////////////////////////////

const transforms = [
	({x,y}) => ({x: y/2, 		y: x/2}),
	({x,y}) => ({x: x/2, 		y: y/2 + 1/2}),
	({x,y}) => ({x: x/2 + 1/2, 	y: y/2 + 1/2}),
	({x,y}) => ({x: 1 - y/2, 	y: 1/2 - x/2}),
] 
// four self similar transformations
//             . . .   . . >
//                 .   .
//             < . .   . . .
// . . .           
// .   .   =>  .   ^   .   ^
// .   v       .   .   .   .
//             . . .   . . .

const fractal = D => {
	let points = [{x: .5, y: .5}]
	for (let i = 0; i < D; i++)
		points = transforms.map(m => points.map(p => m(p))).flat()

	ctx.lineWidth = 2**(-D-1)
	pen.clear()
	pen.rainbow_line(points)
}

///////////////////////////////////

let canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
ctx.scale(canvas.width, canvas.height)

let i = 1
fractal(i)

document.onmousedown = e => {
	i += (e.button == 0) - (e.button == 2)
	i = Math.max(1, Math.min(7, i))
	fractal(i)
}