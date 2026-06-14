const header = document.querySelector('[data-header]')
const panel = document.querySelector('[data-menu-panel]')
const openButton = document.querySelector('[data-menu-open]')
const closeButton = document.querySelector('[data-menu-close]')

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 75)
}

setHeaderState()
window.addEventListener('scroll', setHeaderState, { passive: true })

openButton?.addEventListener('click', () => {
  panel?.classList.add('is-open')
  panel?.setAttribute('aria-hidden', 'false')
})

closeButton?.addEventListener('click', () => {
  panel?.classList.remove('is-open')
  panel?.setAttribute('aria-hidden', 'true')
})

panel?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    panel.classList.remove('is-open')
    panel.setAttribute('aria-hidden', 'true')
  })
})

const revealNodes = document.querySelectorAll('.reveal')

revealNodes.forEach((node, index) => {
  node.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`)
})

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -30px 0px', threshold: 0.01 },
  )

  revealNodes.forEach((node) => observer.observe(node))
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'))
}

const menuBoard = document.querySelector('[data-menu-board]')

if (menuBoard) {
  const buttons = [...menuBoard.querySelectorAll('[data-category]')]
  const items = [...menuBoard.querySelectorAll('[data-menu-category]')]
  const menuItems = menuBoard.querySelector('.menu-items')
  const menuSelector = menuBoard.querySelector('.menu-selector')
  const requestedCategory = new URLSearchParams(window.location.search).get('category') || 'all'
  const knownCategories = buttons.map((button) => button.dataset.category)

  const scrollToMenuItems = () => {
    if (!menuItems) {
      return
    }

    const stickyOffset = (header?.offsetHeight || 0) + (menuSelector?.offsetHeight || 0) + 14
    const top = menuItems.getBoundingClientRect().top + window.scrollY - stickyOffset

    window.scrollTo({ top, behavior: 'smooth' })
  }

  const stickyThreshold = 6 * parseFloat(getComputedStyle(document.documentElement).fontSize)
  const updateStickyState = () => {
    menuSelector.classList.toggle('is-stuck', menuSelector.getBoundingClientRect().top <= stickyThreshold)
  }
  window.addEventListener('scroll', updateStickyState, { passive: true })
  updateStickyState()

  const selectCategory = (category, shouldScroll = false) => {
    const activeCategory = knownCategories.includes(category) ? category : 'all'

    buttons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.category === activeCategory)
    })

    items.forEach((item) => {
      const shouldShow = activeCategory === 'all' || item.dataset.menuCategory === activeCategory
      item.classList.toggle('is-hidden', !shouldShow)
    })

    const url = new URL(window.location.href)

    if (activeCategory === 'all') {
      url.searchParams.delete('category')
    } else {
      url.searchParams.set('category', activeCategory)
    }

    window.history.replaceState({}, '', url)

    if (shouldScroll) {
      window.requestAnimationFrame(scrollToMenuItems)
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => selectCategory(button.dataset.category, true))
  })

  selectCategory(requestedCategory)
}
