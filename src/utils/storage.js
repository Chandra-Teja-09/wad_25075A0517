import { getStorageKey } from './auth';

export const getWorkoutPlans = () => {
  const key = getStorageKey('fitness-workouts');
  if (!key) return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const saveWorkoutPlans = (plans) => {
  const key = getStorageKey('fitness-workouts');
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(plans));
};

export const getProgressLogs = () => {
  const key = getStorageKey('fitness-progress');
  if (!key) return [];
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const saveProgressLogs = (logs) => {
  const key = getStorageKey('fitness-progress');
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(logs));
};
