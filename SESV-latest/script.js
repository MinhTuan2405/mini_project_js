/////////////

function scrollToElm(container, elm, duration){
    var pos = getRelativePos(elm);
    scrollTo(container, pos.top , duration/1000);  // duration in seconds
  }
  
  function getRelativePos(elm){
    var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
        cPos = elm.getBoundingClientRect(), // target pos
        pos = {};
  
    pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
    pos.right  = cPos.right  - pPos.right,
    pos.bottom = cPos.bottom - pPos.bottom,
    pos.left   = cPos.left   - pPos.left;
  
    return pos;
  }
      
  function scrollTo(element, to, duration, onDone) {
      var start = element.scrollTop,
          change = to - start,
          startTime = performance.now(),
          val, now, elapsed, t;
  
      function animateScroll(){
          now = performance.now();
          elapsed = (now - startTime)/1000;
          t = (elapsed/duration);
  
          element.scrollTop = start + change * easeInOutQuad(t);
  
          if( t < 1 )
              window.requestAnimationFrame(animateScroll);
          else
              onDone && onDone();
      };
  
      animateScroll();
  }
  
function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t };


const generateNode = (data) => {
    return `
    <div class="lecture-contents">
        <a href="https://www.sesvtutorial.com${data.fields.slug}" target="_blank"></a>
        <p class="title">${data.frontmatter.title}</p>
        <p class="tag">${data.frontmatter.tags.join (" | ")}</p>
        <p class="date">${data.frontmatter.date.substring (0, 10)}</p>
    </div>
    `
}



const display = async () => {
    const allCourses = []
    await fetch ('https://www.sesvtutorial.com/page-data/tutorials/page-data.json')
    .then (res => res.json ())
    .then (res => res["result"]["data"]["posts"]["edges"])
    .then (res => {
        
        res.forEach(element => {
            const newContent = generateNode (element.node)
            const container = document.querySelector ('.container')
            container.innerHTML += newContent
             // Create a DOMParser instance
            const parser = new DOMParser();

            // Parse the string into an HTML document
            const doc = parser.parseFromString(newContent, 'text/html');

            // Get the first child of the body (which is our div)
            const lectureContents = doc.body.firstChild;
            allCourses.push (lectureContents)
        });
    })

    return allCourses
}

const operateWebsite = async () => {
    
    const allCurrentCourses = await display ()

    const allCourse = document.querySelectorAll ('.lecture-contents')
    console.log (allCourse)
    const history = []
    allCourse.forEach ((course) => {
        console.log (course)
        course.addEventListener ('click', () => {
           history.push (course.querySelector ('a').getAttribute ('href'))
           console.log (history[history.length -1])
           document.querySelector ('.confirmation').classList.remove ('hidden')
           document.querySelector ('.overlay').classList.remove ('hidden')

           document.querySelector ('.confirm').addEventListener ('click', () => {
                window.open (history[history.length-1])
                document.querySelector ('.confirmation').classList.add ('hidden')
                document.querySelector ('.overlay').classList.add ('hidden')
            })


            document.querySelector ('.reject').addEventListener ('click', () => {
                document.querySelector ('.confirmation').classList.add ('hidden')
                document.querySelector ('.overlay').classList.add ('hidden')
            })

            document.querySelector ('.overlay').addEventListener ('click', () => {
                document.querySelector ('.confirmation').classList.add ('hidden')
                document.querySelector ('.overlay').classList.add ('hidden')
            })
        })

    })

}

operateWebsite ()


