import PagePomo from '@/pages/Pomo';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
        <PagePomo />
    </ErrorBoundary>
);
};

export default App;
