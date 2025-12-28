// 模态搜索控制器 - 基于 PaperMod fastsearch.js 改造

(function () {
  "use strict";

  // 全局变量
  let searchModal = null;
  let searchInput = null;
  let searchResults = null;
  let searchLoading = null;
  let searchEmpty = null;
  let searchToggleBtn = null;
  let searchCloseBtn = null;
  let searchOverlay = null;

  let fuse = null;
  let searchIndexLoaded = false;
  let currentFocusIndex = -1;

  // ==================== 初始化 ====================
  function initSearchModal() {
    // 获取 DOM 元素
    searchModal = document.getElementById("search-modal");
    searchInput = document.getElementById("modal-search-input");
    searchResults = document.getElementById("modal-search-results");
    searchLoading = document.querySelector(".search-modal-loading");
    searchEmpty = document.querySelector(".search-modal-empty");
    searchToggleBtn = document.getElementById("search-toggle");
    searchCloseBtn = document.querySelector(".search-modal-close");
    searchOverlay = document.querySelector(".search-modal-overlay");

    if (!searchModal || !searchInput || !searchResults) {
      return; // 如果必要元素不存在，退出
    }

    // 绑定事件
    if (searchToggleBtn) {
      searchToggleBtn.addEventListener("click", openSearchModal);
    }
    if (searchCloseBtn) {
      searchCloseBtn.addEventListener("click", closeSearchModal);
    }
    if (searchOverlay) {
      searchOverlay.addEventListener("click", closeSearchModal);
    }

    // 全局键盘事件
    document.addEventListener("keydown", handleGlobalKeydown);
  }

  // ==================== 打开模态框 ====================
  function openSearchModal() {
    searchModal.style.display = "flex";
    // 延迟添加 active 类以触发动画
    setTimeout(() => {
      searchModal.classList.add("active");
      searchInput.focus();
    }, 10);

    // 禁用背景滚动
    document.body.style.overflow = "hidden";

    // 懒加载搜索索引
    if (!searchIndexLoaded) {
      loadSearchIndex();
    }

    // 设置 ARIA 属性
    searchModal.setAttribute("aria-hidden", "false");
  }

  // ==================== 关闭模态框 ====================
  function closeSearchModal() {
    searchModal.classList.remove("active");
    // 延迟隐藏以等待动画完成
    setTimeout(() => {
      searchModal.style.display = "none";
      searchInput.value = "";
      searchResults.innerHTML = "";
      searchEmpty.style.display = "none";
      currentFocusIndex = -1;
    }, 200);

    // 恢复背景滚动
    document.body.style.overflow = "";

    // 设置 ARIA 属性
    searchModal.setAttribute("aria-hidden", "true");
  }

  // ==================== 加载搜索索引 ====================
  function loadSearchIndex() {
    searchLoading.style.display = "flex";

    fetch("/index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load search index");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // Fuse.js 配置
          const options = {
            distance: 100,
            threshold: 0.4,
            ignoreLocation: true,
            keys: ["title", "permalink", "summary", "content"],
          };

          fuse = new Fuse(data, options);
          searchIndexLoaded = true;
          searchLoading.style.display = "none";

          // 绑定输入事件
          searchInput.addEventListener("input", handleSearch);
          searchInput.addEventListener("keydown", handleSearchKeydown);
        }
      })
      .catch((error) => {
        console.error("Error loading search index:", error);
        searchLoading.style.display = "none";
        searchResults.innerHTML =
          '<li style="padding: 20px; text-align: center; color: var(--secondary);">搜索索引加载失败</li>';
      });
  }

  // ==================== 处理搜索 ====================
  function handleSearch(e) {
    const query = e.target.value.trim();

    if (!query) {
      searchResults.innerHTML = "";
      searchEmpty.style.display = "none";
      currentFocusIndex = -1;
      return;
    }

    if (!fuse) {
      return;
    }

    const results = fuse.search(query, { limit: 10 });
    renderResults(results);
  }

  // ==================== 渲染结果 ====================
  function renderResults(results) {
    searchEmpty.style.display = "none";
    currentFocusIndex = -1;

    if (results.length === 0) {
      searchResults.innerHTML = "";
      searchEmpty.style.display = "flex";
      return;
    }

    const html = results
      .map((result, index) => {
        const item = result.item;
        const title = escapeHtml(item.title || "");
        const summary = escapeHtml(item.summary || "");

        return `
                <li data-url="${escapeHtml(
                  item.permalink
                )}" data-index="${index}" role="option">
                    <div class="search-result-title">${title}</div>
                    ${
                      summary
                        ? `<div class="search-result-summary">${summary}</div>`
                        : ""
                    }
                </li>
            `;
      })
      .join("");

    searchResults.innerHTML = html;

    // 绑定点击事件
    const items = searchResults.querySelectorAll("li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        window.location.href = item.dataset.url;
      });
    });
  }

  // ==================== 搜索框键盘导航 ====================
  function handleSearchKeydown(e) {
    const items = searchResults.querySelectorAll("li[data-url]");

    if (items.length === 0) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentFocusIndex < items.length - 1) {
          currentFocusIndex++;
          updateFocus(items);
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (currentFocusIndex > 0) {
          currentFocusIndex--;
          updateFocus(items);
        }
        break;

      case "Enter":
        e.preventDefault();
        if (currentFocusIndex >= 0 && items[currentFocusIndex]) {
          window.location.href = items[currentFocusIndex].dataset.url;
        }
        break;
    }
  }

  // ==================== 更新焦点 ====================
  function updateFocus(items) {
    // 移除所有焦点
    items.forEach((item) => item.classList.remove("focus"));

    // 添加当前焦点
    if (currentFocusIndex >= 0 && items[currentFocusIndex]) {
      const focusedItem = items[currentFocusIndex];
      focusedItem.classList.add("focus");

      // 滚动到可见区域
      focusedItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  // ==================== 全局键盘快捷键 ====================
  function handleGlobalKeydown(e) {
    // Alt + / 打开搜索
    if (e.altKey && e.key === "/") {
      e.preventDefault();
      if (!searchModal.classList.contains("active")) {
        openSearchModal();
      }
    }

    // Esc 关闭搜索
    if (
      e.key === "Escape" &&
      searchModal &&
      searchModal.classList.contains("active")
    ) {
      e.preventDefault();
      closeSearchModal();
    }
  }

  // ==================== 辅助函数 ====================
  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  // ==================== 页面加载完成后初始化 ====================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearchModal);
  } else {
    initSearchModal();
  }
})();
