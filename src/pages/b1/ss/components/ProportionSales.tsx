import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { IVisitData } from '../data';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  loading,
  dropdownGroup,
  salesType,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: IVisitData[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="Categories of Sales"
    style={{ height: '100%' }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">ALL</Radio.Button>
            <Radio.Button value="online">Online</Radio.Button>
            <Radio.Button value="stores">Stores</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <h4 style={{ marginTop: 8, marginBottom: 32 }}>Sales</h4>
    <Pie
      hasLegend
      subTitle="Sales"
      total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
      data={salesPieData}
      valueFormat={value => <Yuan>{value}</Yuan>}
      height={248}
      lineWidth={4}
    />
  </Card>
);

export default ProportionSales;
