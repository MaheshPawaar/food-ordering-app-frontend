import { Button } from './ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

const LoadingButton = () => {
  return (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
};

export default LoadingButton;
