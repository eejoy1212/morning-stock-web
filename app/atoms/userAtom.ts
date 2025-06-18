// src/atoms/userAtom.ts
import { atom } from 'recoil'

export const userEmailState = atom<string | null>({
  key: 'userEmailState',
  default: null,
})
