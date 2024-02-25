const main = document.querySelector('main')
const sections = main.querySelectorAll('section')
const clientHeight = document.documentElement.clientHeight // 브라우저 높이
const scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
)
const scrollRange = scrollHeight - clientHeight // 세로방향 스크롤 범위
const scrollRangeOfOneSection = scrollRange / (sections.length - 1) // 하나의 섹션에 대한 스크롤 범위
let index = 0, timer

// 1초동안 이벤트 금지하기 (자연스러운 슬라이드 효과 연출)
function trotthling(handler, e){
  if(!timer){
    timer = setTimeout(function(){
      handler(e)
      timer = null 
    }, 1000)
  }
}

function changeSlide(e){
  console.log('scroll', e.deltaY)
  
  if(e.deltaY > 0){ // 스크롤 내린 경우
    index++
    if(index > sections.length -1) index = 0
    console.log(index)
  }else{ // 스크롤 올린 경우
    index--
    if(index < 0) index = sections.length - 1
    console.log(index)
  }
  // // index 에 해당하는 섹션을 제외한 기존스타일 초기화
  // // 이전/다음 슬라이드로 모두 전환가능
  // for(let i=0; i<sections.length; i++){
  //     const section = sections[i]
  //     console.log(i, section)
  //     section.style.opacity = '0'
  //     section.style.height = '0'
    
  // }

  // 섹션에 애니메이션 적용하기 
  const section = sections[index]
  section.style.opacity = '1'
  section.style.height = '100vh'
}

document.addEventListener('wheel', (e) => trotthling(changeSlide, e))