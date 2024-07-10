import { useEffect } from 'react';
import { Query } from '../types';

interface UseKeyboardNavigationProps {
  queries: Query[];
  removeQuery: (index: number) => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
  queryRefs: (HTMLDivElement | null)[];
  buttonRefs: (HTMLButtonElement | null)[];
}

const useKeyboardNavigation = ({
  queries,
  removeQuery,
  inputRefs,
  queryRefs,
  buttonRefs,
}: UseKeyboardNavigationProps): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      const allRefs = [
        ...queryRefs.flatMap((ref, i) => [ref, buttonRefs[i]]),
        ...inputRefs.map(ref => ref.current),
      ].filter(Boolean) as HTMLElement[];

      const currentIndex = allRefs.findIndex(ref => ref === activeElement);
      
      if (event.key === 'ArrowRight') {
        if (currentIndex !== -1) {
          const input = inputRefs.find(ref => ref.current === activeElement)?.current;

          if (input && input.selectionEnd !== input.value.length) return;
          const nextRef = allRefs[currentIndex + 1] || allRefs[0];
          nextRef?.focus();
          event.preventDefault();
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          const input = inputRefs.find(ref => ref.current === activeElement)?.current;
          if (input && input.selectionStart !== 0) return;
          const nextRef = allRefs[currentIndex - 1] || allRefs[allRefs.length - 1];
          nextRef?.focus();
          event.preventDefault();
        }
      } else if (event.key === 'Backspace' && activeElement.dataset.queryIndex) {
        removeQuery(Number(activeElement.dataset.queryIndex));
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [queries, removeQuery, inputRefs, queryRefs, buttonRefs]);
};

export default useKeyboardNavigation;
