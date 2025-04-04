import { Suspense, lazy, useMemo } from 'react';
import React from 'react';

const loadPage = (id: string) => {
  const Page = lazy(() => import(`@/pages/${id}`));
  return (
    <Suspense fallback={<></>}>
      <Page />
    </Suspense>
  );
};

const RouterList: Array<iRouter> = [
  {
    path: '*',
    element: loadPage('Pomo'),
    needLogin: false,
  },
];

export default RouterList;
