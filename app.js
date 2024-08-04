// generate the output with the user input
const generate = () => {
	let format = document.querySelector('.format').value,
		textureName = document.querySelector('.name').value,
		merSuffix = document.querySelector('.mer').value,
		suffix = document.querySelector('.normal').value,
		type = document.getElementById('toggle').checked === true ? 'normal' : 'heightmap',
		textOutput = document.getElementById('output')
	const output = `
{
  "format_version": "${format}",
    "minecraft:texture_set": {
      "color": "${textureName}",
      "metalness_emissive_roughness": "${textureName}_${merSuffix}",
      "${type}": "${textureName}_${suffix}"
  }
}`
	textOutput.value = output
}

// generate downloadable json file when button is clicked
const download = () => {
	let textureName = document.querySelector('.name').value,
		link = document.createElement('a'),
		content = document.querySelector('textarea').value,
		file = new Blob([content], { type: 'text/plain' })
	link.href = URL.createObjectURL(file)
	link.download = `${textureName}.texture_set.json`
	link.click()
	URL.revokeObjectURL(link.href)
}

// default template
const template = () => {
	let textureName = document.querySelector('.name'),
		merSuffix = document.querySelector('.mer'),
		suffix = document.querySelector('.normal')
	textureName.value = 'acacia_door_lower'
	merSuffix.value = 'mer'
	suffix = 'normal'
	document.getElementById('toggle').checked = 1
}

// run download function when enter is pressed
document.querySelectorAll('input').forEach((input) => {
	input.addEventListener('keypress', () => {
		input.onkeyup = (key) => {
			key.key === 'Enter' ? download() : generate()
			console.log(key.key)
		}
	})
})

// set everything back to template
document.body.onload = () => {
	template()
	generate()
}
