// mock data for github commits
const commits = [
  { id: 1, message: 'feat: add commit list' },
  { id: 2, message: 'fix: delete commit list' },
  { id: 3, message: 'feat: add commit list' },
  { id: 4, message: 'fix: update commit list' },
]

export const CommitList = () => {
  return <ul>
  {
    commits.map(commit => (
      <li key={commit.id}>{commit.message}</li>
    ))
  }
  </ul>
}