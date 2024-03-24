const id = window.location.pathname.replaceAll('/', '')

console.log(id)

const question = document.querySelector('main > h1')
const optionsList = document.querySelector('ul')
const refresh = document.getElementById('refresh')
let pollOptions = []

async function onLoad() {
    const idsRes = await fetch('/ids')
    const { ids } = await idsRes.json()
    if (!ids.includes(id)) {
        window.location.href = '/'
    }

    const res = await fetch('/data/' + id)
    const { data } = await res.json()
    pollOptions = data.options
    //console.log(pollOptions.values)
    question.innerText = data.question + (data.question.includes('?') ? '' : '?')
    //question.innerHTML = `<a href="${window.location.href}">${question.innerText}</a>`;

    let newInnerListHtml = ''
    Object.keys(data.options).forEach((option, index) => {
        newInnerListHtml += `<li id="${option}"><i class="fa-solid fa-atom"></i>${option} ${pollOptions[option]} vote/s</li>`
    })
    optionsList.innerHTML = newInnerListHtml

    const optionsLi = document.querySelectorAll('li')
    optionsLi.forEach(option => {
        option.addEventListener('click', pplClick)
    })
}

onLoad()

refresh.innerHTML = `<a href=""><i class="fa-solid fa-arrows-rotate"></i></a>`

const linearGradients = ['#00c9ff, #92fe9d', '#fc00ff, #00dbde', '#d38312, #a83279', '#fdfc47, #24fe41']

async function pplClick(index) {
    
    const selected = index.target.id
    const maxNumberOfVotes = Math.max(...Object.values(pollOptions))

    const optionsLi = document.querySelectorAll('li')
    optionsLi.forEach(val => {
        const option = val.id
        val.removeEventListener('click', pplClick)
        val.style.background = `linear-gradient(to right, ${linearGradients[Math.floor(Math.random() * linearGradients.length)]})`
        val.style.color = '#0f17a2'
        val.style.transitionDuration = '200ms'

        if (maxNumberOfVotes !== 0) {
            console.log(option, pollOptions[option])
            if (selected == option) {
                val.style.width = pollOptions[option] === 0 ? '5%' : `${((pollOptions[option] + 1) / maxNumberOfVotes) * 100}%`
            } else {
                val.style.width = pollOptions[option] === 0 ? '5%' : `${(pollOptions[option] / maxNumberOfVotes) * 100}%`
            }        
        }
    })
    //Sending result to server
    const res = await fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            vote: selected
        })
    })
}
