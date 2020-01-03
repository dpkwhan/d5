import React, { Component } from 'react';

import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';

interface SearchProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

@connect()
class Search extends Component<SearchProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'ep':
        router.push(`${url}/ep`);
        break;
      // case 'vp':
      //   router.push(`${url}/vp`);
      //   break;
      // case 'vs':
      //   router.push(`${url}/vs`);
      //   break;
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    // todo
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'ep';
  };

  render() {
    const tabList = [
      {
        key: 'ep',
        tab: 'Execution Progress',
      },
      // {
      //   key: 'vp',
      //   tab: 'Volume Profiles',
      // },
      // {
      //   key: 'vs',
      //   tab: 'Venue Stats',
      // },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="Please enter order id"
          enterButton="Search"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const { children } = this.props;

    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
        title={false}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Search;
