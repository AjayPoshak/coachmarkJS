import Coachmark from '../index.js'

window.onload = () => {
    const demoLink = document.getElementById('js-demo')
    if(demoLink) demoLink.addEventListener('click', () => {
        new Coachmark().init()
    })
}