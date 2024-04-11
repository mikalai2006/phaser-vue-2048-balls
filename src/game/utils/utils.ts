export const shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export const randomInteger = function (min: number, max: number) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export const clamp = function (value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const getDifferenceTime = function (date1: Date, date2: Date) {
  // let date1 = new Date(`2000-01-01T${time1}Z`)
  // let date2 = new Date(`2000-01-01T${time2}Z`)
  // the following is to handle cases where the times are on the opposite side of
  // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM

  if (date2 < date1) {
    date2.setDate(date2.getDate() + 1)
  }

  const diff = date2 - date1
  return diff
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function debounce(func, ms) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, arguments), ms)
  }
}

export function updateParticleRotation(p) {
  return Phaser.Math.RadToDeg(Math.atan2(p.velocityY, p.velocityX))
}
