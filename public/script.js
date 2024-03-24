const labels = document.querySelectorAll('form label')

labels.forEach(label => {
    label.innerHTML = `<i class="fa-solid fa-atom"></i>` + label.innerHTML
})

const addBtn = document.getElementById('add')
const form = document.querySelector('form')
const btns = document.getElementById('buttons')

function addQuestion() {
    const newNode = document.createElement('label')
    form.insertBefore(newNode, btns)
    document.querySelector('label:last-of-type').innerHTML = `<i class="fa-solid fa-atom"></i>` + `<input type="text" required class="options" placeholder="..."></input>`
}

addBtn.addEventListener('click', addQuestion)

const submitBtn = document.getElementById('submit')
async function funcSubmit(e) {
    e.preventDefault()
    const question = document.getElementById('question').value
    const options = Array.from(document.querySelectorAll('.options')).map(option => option.value)
    const uniqueOpts = [...new Set(options)]
   
    const idsRes = await fetch('/ids')
    const { ids } = await idsRes.json()
    const id = ids.length === 0 ? 1 : Math.max(...ids) + 1

    const res = await fetch('/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id,
            question,
            options: uniqueOpts
        })
    })
    if (res.redirected) {
        window.location.href = res.url
    }
    return
}

