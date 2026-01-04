"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-foreground bg-primary/20 border-primary/50";
      case "in-progress":
        return "text-foreground bg-secondary/20 border-secondary/50";
      case "pending":
        return "text-muted-foreground bg-muted/20 border-muted/50";
      default:
        return "text-muted-foreground bg-muted/20 border-muted/50";
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={orbitRef}
        className="relative w-[500px] h-[500px] flex items-center justify-center"
      >
        {/* Orbital rings with glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/20 shadow-[0_0_30px_hsl(var(--neon-cyan)/0.1)]" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-secondary/20 shadow-[0_0_20px_hsl(var(--neon-purple)/0.1)]" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-accent/20 shadow-[0_0_15px_hsl(var(--neon-pink)/0.1)]" />
        </div>

        {/* Center glowing orb */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-background/80" />
        </div>

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          const nodeStyle = {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isExpanded ? 200 : position.zIndex,
            opacity: isExpanded ? 1 : position.opacity,
          };

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute transition-all duration-700 cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Pulse ring effect */}
              {(isRelated || isPulsing) && (
                <div className="absolute inset-0 -m-2 rounded-full border-2 border-primary animate-ping-glow" />
              )}

              {/* Node circle with glow */}
              <div
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isExpanded
                    ? "scale-125 bg-primary shadow-[0_0_40px_hsl(var(--neon-cyan)/0.6)]"
                    : isRelated
                    ? "scale-110 bg-secondary shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)]"
                    : "bg-card border border-border hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)]"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isExpanded ? "text-primary-foreground" : "text-primary"
                  }`}
                />
              </div>

              {/* Node label */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-all ${
                  isExpanded ? "text-primary glow-text" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 orbital-card z-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${getStatusStyles(item.status)} border`}
                      >
                        {item.status === "completed"
                          ? "COMPLETE"
                          : item.status === "in-progress"
                          ? "IN PROGRESS"
                          : "PENDING"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-2 text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {item.content}
                    </p>

                    {/* Energy bar with glow */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Zap className="w-4 h-4 text-primary" />
                          Energy Level
                        </span>
                        <span className="text-primary font-medium">
                          {item.energy}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_10px_hsl(var(--neon-cyan)/0.5)]"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Link className="w-4 h-4 text-secondary" />
                          <span className="text-sm font-medium text-secondary">
                            Connected Nodes
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find(
                              (i) => i.id === relatedId
                            );
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="text-xs border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { RadialOrbitalTimeline };
export type { TimelineItem, RadialOrbitalTimelineProps };
