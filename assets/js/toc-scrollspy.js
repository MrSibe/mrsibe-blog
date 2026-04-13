/**
 * TOC Scrollspy - 滚动时高亮当前章节
 * 功能：
 * 1. 监听文章滚动
 * 2. 计算当前可见的章节标题
 * 3. 更新 TOC 链接的 active 状态
 * 4. 实现平滑滚动效果
 */

(function() {
  'use strict';

  // 配置选项
  const config = {
    rootMargin: '-20% 0px -70% 0px', // Intersection Observer 观察范围
    threshold: 0, // 触发阈值
    scrollOffset: 100, // 点击 TOC 链接时的滚动偏移（避免被 header 遮挡）
  };

  // 初始化
  function initScrollspy() {
    const tocWrapper = document.querySelector('.sidebar-toc-wrapper');
    const articleContent = document.querySelector('.post-content');

    // 检查必要的元素是否存在
    if (!tocWrapper || !articleContent) return;

    const tocLinks = tocWrapper.querySelectorAll('a[href^="#"]');
    const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6[id]');

    if (headings.length === 0 || tocLinks.length === 0) return;

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          updateActiveTocLink(id, tocLinks);
        }
      });
    }, {
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });

    // 观察所有章节标题
    headings.forEach(heading => {
      if (heading.getAttribute('id')) {
        observer.observe(heading);
      }
    });

    // 为 TOC 链接添加平滑滚动
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top
                                 + window.pageYOffset
                                 - config.scrollOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // 立即更新 active 状态（提供即时反馈）
          updateActiveTocLink(targetId, tocLinks);
        }
      });
    });

    // 初始状态：高亮第一个章节
    if (headings.length > 0) {
      const firstHeadingId = headings[0].getAttribute('id');
      if (firstHeadingId) {
        updateActiveTocLink(firstHeadingId, tocLinks);
      }
    }
  }

  // 更新 TOC 活动链接
  function updateActiveTocLink(activeId, tocLinks) {
    // 移除所有 active 类
    tocLinks.forEach(link => {
      link.classList.remove('active');
    });

    // 添加 active 类到当前链接
    const activeLink = document.querySelector(`.sidebar-toc-wrapper a[href="#${activeId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollspy);
  } else {
    initScrollspy();
  }

})();