export function decodeAndParseData(playerDataString, gameDataString) {
  try {
    const decodedPlayerDataString = decodeURIComponent(atob(playerDataString))
    const decodedGameDataString = decodeURIComponent(atob(gameDataString))
    const playerData = JSON.parse(decodedPlayerDataString)
    const gameData = JSON.parse(decodedGameDataString)

    return {
      playerData,
      gameData
    }
  } catch (error) {
    console.error('데이터 디코딩 및 파싱 중 오류가 발생했습니다.', error)
    return null
  }
}

export function encodeAndStringifyObject(resultObject) {
  try {
    // 객체를 JSON 문자열로 변환
    const jsonString = JSON.stringify(resultObject)

    // JSON 문자열을 인코딩하고 base64로 인코딩
    const resultString = btoa(encodeURIComponent(jsonString))

    return resultString
  } catch (error) {
    console.error('데이터 인코딩 중 오류가 발생했습니다.', error)
    return null
  }
}
