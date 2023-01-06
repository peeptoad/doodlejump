document.addEventListener('DOMContentLoaded', () => {
      const grid = document.querySelector('.grid')
      const doodler = document.createElement('div')
      let doodlerLeftSpace = 50
      let startPoint = 150
      let doodlerBottomSpace = startPoint
      let platformCount = 5
      let isGameOver = false
      let platforms = []
      let upTimerId 
      let downTimerId
      let isJumping = true
      let isGoingLeft = false
      let isGoingRight = false
      let leftTimerId
      let RightTimerId
      let score = 0
      

      function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
      }

      class Platform {
        constructor(newPlatBottom) {
            this.left = Math.random() * 315
            this.bottom = newPlatBottom
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
      }

      function createPlatforms() {
         for (let i =0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            var newPlatform = new Platform (newPlatBottom)
            platforms.push(newPlatform)
            
         }
      }

      function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    console.log(platforms)
                    var newPlatform = new Platform (600)
                    platforms.push(newPlatform)
                }
            })
        }
      }

      function jump() { 
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
            
            
        },20)
      }
      
      function fall() {
         clearInterval(upTimerId)
         isJumping = false
         downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
             
             if (doodlerBottomSpace <= 0) {
                gameOver()
             }
             
             platforms.forEach(Platform => {
                if (
                    (doodlerBottomSpace >= Platform.bottom) &&
                    (doodlerBottomSpace <= Platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= Platform.left) &&
                    (doodlerLeftSpace <= (Platform.left + 85)) &&
                    !isJumping
                )
                {
                    
                    startPoint = doodlerBottomSpace
                    jump()
                }
             })
             
         },20)
      }  

      
    
       function control(e) {
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (e.key === "ArrowLeft") {
            moveLeft()
        }
        else if (e.key === "ArrowRight") {
            moveRight()
        }
        else if (e.key === "ArrowUp") {
            moveStraight()
        }
       }

       function moveLeft() {

        if (isGoingLeft) {
            return
        }

        else if (isGoingRight) {
            clearInterval(RightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
            doodlerLeftSpace -=5 
            doodler.style.left = doodlerLeftSpace + 'px'
            }
            else moveRight()
        },30)
       } 

       function moveRight() {

        if (isGoingRight) {
            return
        }
        
         else if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true 
        RightTimerId = setInterval(function ()  {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace +=5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
            
        }, 30);
        console.log(moveRight)
       }

       function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(RightTimerId)
      }

       function moveStraight() {
        isGoingRight = false
        isGoingLeft = false
        clearInterval(leftTimerId)
        clearInterval(RightTimerId)
       }

       

       function gameOver() {
        console.log('game over')
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(RightTimerId)
       }

      function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms,30)
            jump()
            document.addEventListener('keyup', control)
        }
      }

      start()
      
})