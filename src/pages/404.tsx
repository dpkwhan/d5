import { Button, Result } from 'antd';
import React from 'react';
import router from 'umi/router';

// Here we should use the 404 result component from antd, which is not released yet.
// A simplified version is provided here for the time being.

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        Back Home
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
