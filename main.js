import { createTable } from './jsmodules/create-table.js'

const dropZoneInput = document.getElementById('drop-zone-input')
const dropZoneBox = document.getElementById('drop-zone-box')
const domTable = document.getElementById('data-table')
const searchFilter = document.getElementById('search')
const clearBtn = document.getElementById('clear-btn')

document.addEventListener('DOMContentLoaded', (e) => {
  dropZoneBox.addEventListener('click', (e) => {
    dropZoneInput.click()
  })

  dropZoneInput.addEventListener('change', (e) => {
    e.preventDefault()
    pageClear()
    const reader = new FileReader()
    reader.onload = function (e) {
      displayData(reader.result)
    }
    reader.readAsBinaryString(dropZoneInput.files[0])
  })

  function displayData(res) {
    dropZoneBox.classList.add('hide')
    createTable(res)
    const checks = document.querySelectorAll('input[name="include"]')
    const searchCells = document.querySelectorAll('[class^="ctrl-"')
    clearBtn.addEventListener('click', () => pageClear())
    searchFilter.addEventListener('input', (e) => searchData(e.target.value))
    checks.forEach((check, idx) => {
      check.addEventListener('change', () => {
        if (check.checked === true) {
          searchCells.forEach((cell) => {
            if (cell.classList.contains(`ctrl-${idx}`)) {
              cell.classList.add('search')
            }
          })
        } else if (check.checked === false) {
          searchCells.forEach((cell) => {
            if (cell.classList.contains(`ctrl-${idx}`)) {
              cell.classList.remove('search')
            }
          })
        }
      })
    })
  }

  function pageClear() {
    searchFilter.value = ''
    // location.reload()
    while (domTable.firstChild) {
      domTable.removeChild(domTable.firstChild)
    }
  }

  function searchData(searchTerm) {
    const rowSearch = document.querySelectorAll('.search-row')
    rowSearch.forEach((rowItem) => {
      const cellSearch = rowItem.querySelectorAll('td.search')
      let cntr = 0
      cellSearch.forEach((cell, i) => {
        if (cell.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
          cntr++
        }
      })
      if (cntr > 0) {
        rowItem.classList.remove('hide')
      } else {
        rowItem.classList.add('hide')
      }
    })
  }
})
