import { Avatar, Card, Form, Icon, List, Tooltip } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import numeral from 'numeral';
import { StateType } from './model';
import { IListItemData } from './data.d';
import styles from './style.less';

export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          Million
        </span>
      </span>
    );
  }
  return result;
}

interface ApplicationsProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  b1SofExecutionProgress: StateType;
  loading: boolean;
}

class Applications extends Component<ApplicationsProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'b1SofExecutionProgress/fetch',
      payload: {
        count: 6,
      },
    });
  }

  render() {
    const {
      b1SofExecutionProgress: { list },
      loading,
    } = this.props;

    const CardInfo: React.FC<{
      activeUser: React.ReactNode;
      newUser: React.ReactNode;
    }> = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );

    return (
      <div className={styles.filterCardList}>
        <List<IListItemData>
          rowKey="id"
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip key="download" title="下载">
                    <Icon type="download" />
                  </Tooltip>,
                  <Tooltip key="edit" title="编辑">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip title="分享" key="share">
                    <Icon type="share-alt" />
                  </Tooltip>,
                ]}
              >
                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    activeUser={formatWan(item.activeUser)}
                    newUser={numeral(item.newUser).format('0,0')}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const WarpForm = Form.create<ApplicationsProps>({
  onValuesChange({ dispatch }: ApplicationsProps) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
    dispatch({
      type: 'b1SofExecutionProgress/fetch',
      payload: {
        count: 8,
      },
    });
  },
})(Applications);

export default connect(
  ({
    b1SofExecutionProgress,
    loading,
  }: {
    b1SofExecutionProgress: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    b1SofExecutionProgress,
    loading: loading.models.b1SofExecutionProgress,
  }),
)(WarpForm);
