CREATE DATABASE IF NOT EXISTS lld_practice;
USE lld_practice;

CREATE TABLE IF NOT EXISTS problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  description VARCHAR(500) NOT NULL,
  problem_statement TEXT NOT NULL,
  requirements JSON NOT NULL,
  constraints TEXT NOT NULL,
  expected_areas JSON NOT NULL,
  difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  problem_id INT NOT NULL,
  status ENUM('IN_PROGRESS', 'SUBMITTED', 'EVALUATING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'IN_PROGRESS',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_attempt_problem FOREIGN KEY (problem_id) REFERENCES problems(id),
  INDEX idx_attempt_problem (problem_id), INDEX idx_attempt_status (status)
);

CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attempt_id INT NOT NULL UNIQUE,
  requirements_understanding TEXT NOT NULL,
  assumptions TEXT NOT NULL,
  classes TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  relationships TEXT NOT NULL,
  design_explanation TEXT NOT NULL,
  tradeoffs TEXT NOT NULL,
  edge_cases TEXT NOT NULL,
  testing_approach TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_submission_attempt FOREIGN KEY (attempt_id) REFERENCES attempts(id)
);

CREATE TABLE IF NOT EXISTS evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attempt_id INT NOT NULL UNIQUE,
  evaluator_type VARCHAR(40) NOT NULL,
  status ENUM('EVALUATING', 'COMPLETED', 'FAILED') NOT NULL,
  overall_summary TEXT,
  strengths JSON,
  improvement_areas JSON,
  next_steps JSON,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  CONSTRAINT fk_evaluation_attempt FOREIGN KEY (attempt_id) REFERENCES attempts(id)
);

CREATE TABLE IF NOT EXISTS feedback_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  evaluation_id INT NOT NULL,
  criterion VARCHAR(120) NOT NULL,
  score TINYINT NOT NULL,
  evidence TEXT NOT NULL,
  concern TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  confidence DECIMAL(3,2) NOT NULL,
  CONSTRAINT fk_feedback_evaluation FOREIGN KEY (evaluation_id) REFERENCES evaluations(id) ON DELETE CASCADE,
  INDEX idx_feedback_evaluation (evaluation_id)
);
