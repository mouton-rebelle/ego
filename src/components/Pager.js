import React, { PropTypes } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
const numPagesToShow = 5

class Page {
  constructor (label, page, disabled, current = false) {
    this.label = label
    this.page = page
    this.disabled = disabled
    this.current = current
  }
}

const Pager = ({ basePath, nbPages, currentPage }) => {
  let pages = []
  if (nbPages < 2) {
    return <div/>
  }

  let startPager = currentPage - Math.floor(numPagesToShow / 2)

  if (startPager < 1) {
    startPager = 1
  }
  if ((startPager + numPagesToShow) > nbPages) {
    startPager = nbPages - numPagesToShow
  }

  pages.push(new Page('first', 1, currentPage === 1))
  pages.push(new Page('prev', currentPage - 1, currentPage === 1))

  for (let p = startPager; p <= startPager + numPagesToShow; p++) {
    pages.push(new Page(p, p, p === currentPage, p === currentPage))
  }

  pages.push(new Page('next', currentPage + 1, currentPage === nbPages))
  pages.push(new Page('last', nbPages, currentPage === nbPages))

  return (
    <div className='pager'>
      <div className='pager__legend'>showing page {currentPage} of {nbPages}</div>
      <div className='pager__content'>
        {
          pages.map((p, index) => {
            const classes = cx('pager__content__item', {
              'pager__content__item--active': p.current,
              'pager__content__item--disabled': p.disabled && !p.current,
              'pager__content__item--hoverable': !p.current && !p.disabled
            })
            return p.disabled
              ? <span className={classes} key={index}>{p.label}</span>
              : <Link className={classes} key={index} to={basePath + p.page}>{p.label}</Link>
          })
        }
      </div>
    </div>
  )
}

Pager.propTypes = {
  basePath: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  nbPages: PropTypes.number.isRequired
}

export default Pager
