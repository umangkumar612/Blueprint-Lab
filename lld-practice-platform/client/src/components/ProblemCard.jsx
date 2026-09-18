import { Link } from 'react-router-dom'

export default function ProblemCard({ problem }) {
  return <article className="problem-card">
    <div className="card-meta"><span className="index-mark">0{problem.id}</span><span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></div>
    <h3>{problem.title}</h3><p>{problem.description}</p>
    <div className="card-footer"><span>{problem.expectedAreas.slice(0, 2).join(' / ')}</span><Link className="arrow-link" to={`/problems/${problem.id}`}>Open brief <span>↗</span></Link></div>
  </article>
}
