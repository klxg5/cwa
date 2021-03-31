export async function getData() {
  try {
    const response = await fetch(
      document.getElementById('console-box').innerHTML
    )
    const dataRaw = await response.text()
    return dataRaw
  } catch (err) {
    console.log(err)
  }
}
