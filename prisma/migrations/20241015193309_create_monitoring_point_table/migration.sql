-- CreateTable
CREATE TABLE "MonitoringPoint" (
    "idPoint" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,

    CONSTRAINT "MonitoringPoint_pkey" PRIMARY KEY ("idPoint","machineId")
);

-- AddForeignKey
ALTER TABLE "MonitoringPoint" ADD CONSTRAINT "MonitoringPoint_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("idMachine") ON DELETE RESTRICT ON UPDATE CASCADE;
