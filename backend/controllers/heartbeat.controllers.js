import prisma from "../utils/prisma.js";

async function createHeartbeat(req, res) {
    try {
        let { projectId, userId, projectName, rootPath } = req.body;
        if (!userId || (!projectId && !projectName)) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let project;
        if (!projectId) {
            project = await prisma.project.create({
                data: {
                    name: projectName,
                    rootPath,
                    userId,

                }
            })

            projectId = project.id;
        } else {
            project = await prisma.project.findFirst({
                where: { id: projectId, userId },
            });

            if (!project) {
                return res.status(403).json({ error: "Project not found or unauthorized" });
            }
        }

        const latestSession = await prisma.session.findFirst({
            where: { userId, projectId },
            orderBy: { startTime: "desc" },
            include: {
                heartbeats: { orderBy: { timestamp: "desc" }, take: 1 },
            }
        });

        const now = new Date();
        let sessionId;
        if (
            latestSession &&
            latestSession.heartbeats.length > 0 &&
            (now.getTime() - new Date(latestSession.heartbeats[0].timestamp).getTime()) / 1000 < 120
        ) {
            sessionId = latestSession.id;

            await prisma.session.update({
                where: { id: sessionId },
                data: { endTime: now },
            });
        } else {
            const newSession = await prisma.session.create({
                data: {
                    projectId,
                    userId,
                    startTime: now,
                }
            });
            sessionId = newSession.id;
        }

        await prisma.heartbeat.create({
            data: {
                projectId, userId, sessionId, timestamp: now
            }
        });

        res.status(200).json({ message: "Heartbeat created successfully" });
    } catch (error) {
        res.status(500).json({ error: error?.message || "Something went wrong" });
    }
}

export { createHeartbeat };