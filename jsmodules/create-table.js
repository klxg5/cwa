const domTable = document.getElementById('data-table')

export function createTable(val) {
  const data = val.trimEnd().split(/\n/)
  data.forEach((el, i) => {
    const row = el.split(',')
    const newRow = document.createElement('tr')
    if (i === 0) {
      newRow.classList.add('header-row')
      row.forEach((el, i) => {
        const newHeader = document.createElement('th')
        newHeader.classList.add('head-cell', `grp-${i}`)
        newHeader.innerHTML = `${el} <input type="checkbox" data-name="${el}" name="include" checked>`
        newRow.appendChild(newHeader)
      })
    } else {
      newRow.classList.add('search-row')
      row.forEach((el, i) => {
        const newCell = document.createElement('td')
        newCell.classList.add(`ctrl-${i}`)
        newCell.classList.add(`search`)
        newCell.innerHTML = el
        newRow.appendChild(newCell)
      })
    }
    domTable.appendChild(newRow)
  })
}
