import React from 'react';
import Alert from '@rhino-ui/components/dist/alert';

function App(): React.ReactElement {
  return (
    <div style={{ padding: '2em' }}>
      <Alert
        title="Contact Created"
        message="The contact was saved on December 3, 2020 at 6:10pm PDT"
        variant="success"
        isClosable
        hasIcon
      />
    </div>
  );
}

export default App;
