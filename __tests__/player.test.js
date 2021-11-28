const playerService = require('../service/player')
const dbHandler = require('./db-handler')

const player1 = {
  name: 'test1234',
  points: 0,
  maxpoints: 5,
}

const player2 = {
  name: 'test5678',
  points: 0,
  maxpoints: 2,
}

beforeAll(async () => {
  await dbHandler.connect()
})

afterEach(async () => {
  await dbHandler.clearDatabase()
})

afterAll(async () => {
  await dbHandler.closeDatabase()
})

describe('player', () => {
  it('add Player', async () => {
    expect(async () => {
      await playerService.addPLayer(player1)
    }).not.toThrow()
  })

  it('get player', async () => {
    const { _id } = await playerService.addPLayer(player1)
    const newPlayer = playerService.getPlayer(_id)
    expect(newPlayer).toEqual(player1)
  })

  it('get players', async () => {
    await playerService.addPLayer(player1)
    await playerService.addPLayer(player2)

    const players = await playerService.getPlayers()
    expect(players.length).toBe(2)
    expect(players).toContainEqual(player1)
    expect(players).toContainEqual(player2)
  })

  it('update player', async () => {
    const { _id } = await playerService.addPLayer(player1)
    await playerService.updatePlayer(_id, { maxpoints: 10 })

    const updatedPlayer = await playerService.getPlayer(_id)
    expect(updatedPlayer.maxpoints).toBe(10)
  })

  it('delete player', async () => {
    const { _id } = await playerService.addPLayer(player1)
    await playerService.deletePlayer(_id)
    const players = await playerService.getPlayers()
    expect(players.length).toBe(0)
  })

  it('delete all players', async () => {
    await playerService.addPLayer(player1)
    await playerService.addPLayer(player2)

    const players = await playerService.getPlayers()
    expect(players.length).toBe(2)

    await playerService.deletePlayers()
    const players2 = await playerService.getPlayers()
    expect(players2.length).toBe(0)
  })

  it('get leaders', async () => {
    await playerService.addPLayer(player1)
    await playerService.addPLayer(player2)

    const leaders = await playerService.getLeaders(1)
    expect(leaders.length).toBe(1)
    expect(leaders).toContainEqual(player1)
  })
})
