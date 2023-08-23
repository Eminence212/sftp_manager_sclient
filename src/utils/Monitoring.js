const getTotal = (array = []) => {
  let totalReceived = 0;
  let totalExecuted = 0;
  let totalError = 0;
  let rows = [];
  for (let i = 0; i < array.length; i++) {
    const { files, name, monitoringDate } = array[i];
    totalReceived += files["in"].length;
    totalExecuted += files["arch"].length;
    totalError += files["err"].length;
    rows.push({
      id: i + 1,
      date: monitoringDate,
      client: name,
      inbox: files["in"].length,
      archive: files["arch"].length,
      erreur: files["err"].length,
    });
  }

  return { totalReceived, totalExecuted, totalError, rows };
};
export const formatMonitoringData = (data = []) => {
  const { totalReceived, totalExecuted, totalError, rows } = getTotal(data);
  return {
    totalReceived,
    totalExecuted,
    totalError,
    rows,
  };
};
