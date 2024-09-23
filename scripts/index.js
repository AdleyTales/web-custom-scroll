
/**
 * webc-scoll
 * web自定义滚动条
 */

function doHandler(dom = document) {
  const scrollContainer = dom.querySelector('.webc-scroll-container') // 滚动容器对象
  const scrollContent = dom.querySelector('.webc-scroll-content')
  const scrollbar = dom.querySelector('.webc-scrollbar')
  const scrollbarThumb = dom.querySelector('.webc-scrollbar-thumb')

  // 
  // 更新自定义的滚动条
  // 
  function updateWebcScrollbar() {
    const scrollContainerHeight = scrollContainer.clientHeight;
    const scrollContentHeight = scrollContent.scrollHeight;
    const scrollbarHeight = scrollbar.clientHeight;
    const scrollPercentage = scrollContainer.scrollTop / (scrollContentHeight - scrollContainerHeight); // 比例

    // 滚动条
    const thumbHeight = (scrollContainerHeight / scrollContentHeight) * scrollContainerHeight;
    const thumbTop = (scrollPercentage * (scrollbarHeight - thumbHeight));

    scrollbarThumb.style.height = `${thumbHeight}px`;
    scrollbarThumb.style.top = `${thumbTop}px`;
  }

  // 
  // 监听滚动容器的滚动事件
  //  
  scrollContainer.addEventListener('scroll', updateWebcScrollbar)

  // 
  // 自定义滚动条的拖动效果
  // 
  scrollbarThumb.addEventListener('mousedown', function (event) {
    event.preventDefault();

    const startY = event.clientY;
    const startTop = parseInt(scrollbarThumb.style.top, 10);

    // move
    function onMouseMove(event) {
      const deltaY = event.clientY - startY;
      const newTop = Math.min(Math.max(0, startTop + deltaY), scrollbar.clientHeight - scrollbarThumb.clientHeight);
      scrollbarThumb.style.top = `${newTop}px`;

      // Calculate and update scroll position based on thumb position
      const containerHeight = scrollContainer.clientHeight;
      const contentHeight = scrollContent.scrollHeight;
      const scrollPercentage = newTop / (scrollbar.clientHeight - scrollbarThumb.clientHeight);
      const scrollTop = scrollPercentage * (contentHeight - containerHeight);
      scrollContainer.scrollTop = scrollTop;
    }

    // mouseup
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // 初始化
  updateWebcScrollbar()
}


Array.from(document.getElementsByClassName('webc-scroll')).forEach(dom => {
  doHandler(dom)
});