// ==================== 智能隐藏/显示顶部导航栏 ====================

(function () {
  'use strict';

  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollTop = 0;
  let scrollThreshold = 10; // 滚动阈值，避免微小滚动触发
  let isScrolling = false;
  let scrollTimeout = null;

  // 监听滚动事件
  window.addEventListener('scroll', handleScroll, { passive: true });

  function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 忽略顶部的微小滚动
    if (currentScrollTop < 0) {
      return;
    }

    // 防抖处理，避免频繁计算
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateHeaderVisibility(currentScrollTop);
        isScrolling = false;
      });
      isScrolling = true;
    }

    // 清除之前的超时
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // 停止滚动后显示 header（可选，提升用户体验）
    scrollTimeout = setTimeout(() => {
      if (currentScrollTop > 100) {
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
      }
    }, 3000);
  }

  function updateHeaderVisibility(currentScrollTop) {
    // 判断滚动方向
    const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
    const scrollDistance = Math.abs(currentScrollTop - lastScrollTop);

    // 只有滚动距离超过阈值才触发
    if (scrollDistance < scrollThreshold) {
      return;
    }

    // 在顶部时始终显示
    if (currentScrollTop <= 0) {
      header.classList.remove('header-hidden');
      header.classList.add('header-visible');
      return;
    }

    // 向下滚动：隐藏 header
    if (scrollDirection === 'down' && currentScrollTop > 100) {
      header.classList.add('header-hidden');
      header.classList.remove('header-visible');
    }
    // 向上滚动：显示 header
    else if (scrollDirection === 'up') {
      header.classList.remove('header-hidden');
      header.classList.add('header-visible');
    }

    // 更新上一次滚动位置
    lastScrollTop = currentScrollTop;
  }

  // 初始化：确保 header 可见
  header.classList.add('header-visible');

  // 页面加载时检查滚动位置
  if (window.pageYOffset > 100) {
    header.classList.add('header-visible');
  }
})();
