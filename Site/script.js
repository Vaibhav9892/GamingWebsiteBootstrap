$(document).ready(function () {
    const bird = $(".bird")
    const container = $(".container")
    const gap = 480


    let birdLeft = 220
    let birdBottom = 180
    let gravity = 2
    var gameOver = false
    let i=0

    function start() {
        birdBottom -= gravity
        bird.css("bottom", birdBottom + "px")
        bird.css("left", birdLeft + "px")
        // if (birdBottom <-16) {
        //     clearInterval(timer)
        //     over()
        // }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 75
        bird.css("bottom", birdBottom + "px")
    }


    let timer = setInterval(start, 12)
    document.addEventListener('keydown', jump)

    function genObs() {
        let obsLeft = 500
        let rndHeight = Math.random() * 80
        let obsBottom = rndHeight
        var obs = document.createElement("div")
        var topObs = document.createElement("div")

        obs.className = 'obstracle'
        topObs.className = 'topObstracle'
        container.append(obs)
        container.append(topObs)
        // obs.css("left", obsLeft + "px")
        // obs.css("bottom", obsBottom + "px")
        obs.style.left = obsLeft + 'px'
        obs.style.bottom = obsBottom + 'px'
        topObs.style.left = obsLeft + 'px'
        topObs.style.bottom = obsBottom + gap + 'px'




        function moveObstacle() {
            obsLeft -= 1.5

            //$(".obstracle").css("left", obsLeft + "px")
            //$(".topObstracle").css("left", obsLeft + "px")
            obs.style.left = obsLeft + "px"
            topObs.style.left = obsLeft + 'px'


            if (obsLeft === -40) {
                clearInterval(timerId)
                obs.remove()
                topObs.remove()
            }
            if (obsLeft > 200 && obsLeft < 280 && birdLeft === 220 &&
                (birdBottom < obsBottom + 130 || birdBottom > obsBottom + gap -220)||
                birdBottom <-16 ) {
                over()
                clearInterval(timerObs)
                clearTimeout(timeout)
            }
            if(obsLeft===200)
            {
                i++
                $('#update').text(i)
            }


        }

        

        var timerObs = setInterval(moveObstacle, 10)

        var timeout = setTimeout(genObs, 2000)
        if (gameOver) {
            obs.remove()
            topObs.remove()
        }
    }
    genObs()
    function retry(){
        location.reload()
    }

    function over() {
        clearInterval(timer)
        gameOver = true
        setTimeout(retry,2000)
        clearTimeout()
        document.removeEventListener('keydown', jump)
        console.log("game over")
    }    

})