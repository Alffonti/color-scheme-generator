const form = document.getElementById('get-color-scheme-btn')
const colors = document.getElementById('colors-generated')
const hexColors = document.getElementById('hex-code-generated')
const hexColorCodes = document.querySelectorAll('.hex-color')


form.addEventListener('click', function(e){
    e.preventDefault()
    const colorSeed = document.getElementById('color-seed').value.slice(1,7)
    const schemeMode = document.getElementById('scheme-mode').value
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSeed}&mode=${schemeMode}&count=5`).then(res => res.json()).then(data => {
        let hexColor = ''
        let colorHtml = ''
        let hexColorHtml = ''
        for (const color of data.colors) {
            hexColor = color.hex.value
            colorHtml += `<div class="color" style="background-color:${hexColor}"></div>`
            hexColorHtml += `<p class="hex-color">${hexColor}</p>`
        }
        colors.innerHTML = colorHtml
        hexColors.innerHTML = hexColorHtml
    })
})

hexColorCodes.forEach(item => {
    item.addEventListener('click', async event => {
      if (!navigator.clipboard) {
        // Clipboard API is not available
        return;
      }
      try {
        await navigator.clipboard.writeText(event.target.innerText);
        let hexCode = event.target.textContent
        event.target.textContent = 'Copied to clipboard';
        setTimeout(() => {
            event.target.textContent = hexCode;
        }, 1100)
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    });
  });