/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
