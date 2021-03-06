import React, { useCallback } from "react";

import { ConnectionTable } from "../../../../../components/EntityTable";
import { Routes } from "../../../../routes";
import useRouter from "../../../../../components/hooks/useRouterHook";
import { Connection } from "../../../../../core/resources/Connection";
import useSyncActions from "../../../../../components/EntityTable/hooks";
import { getConnectionTableData } from "../../../../../components/EntityTable/utils";

type IProps = {
  connections: Connection[];
};

const SourceConnectionTable: React.FC<IProps> = ({ connections }) => {
  const { push } = useRouter();

  const { changeStatus, syncManualConnection } = useSyncActions();

  const data = getConnectionTableData(connections, "source");

  const onChangeStatus = useCallback(
    async (connectionId: string) => {
      const connection = connections.find(
        item => item.connectionId === connectionId
      );

      if (connection) {
        await changeStatus(connection);
      }
    },
    [changeStatus, connections]
  );

  const onSync = useCallback(
    (connectionId: string) => {
      const connection = connections.find(
        item => item.connectionId === connectionId
      );
      if (connection) {
        syncManualConnection(connection);
      }
    },
    [connections, syncManualConnection]
  );

  const clickRow = (source: any) =>
    push(`${Routes.Source}${Routes.Connection}/${source.connectionId}`);

  return (
    <ConnectionTable
      data={data}
      onClickRow={clickRow}
      entity="source"
      onChangeStatus={onChangeStatus}
      onSync={onSync}
    />
  );
};

export default SourceConnectionTable;
