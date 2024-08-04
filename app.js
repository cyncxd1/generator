function generate() {
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

document.querySelectorAll('input').forEach((input) => {
	input.addEventListener('keypress', () => {
		input.onkeyup = (key) => {
			key.key === 'Enter' ? download() : generate()
			console.log(key.key)
		}
	})
})

document.body.onload = () => {
	document.getElementById('toggle').checked = 1
	generate()
}
