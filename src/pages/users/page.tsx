import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchUsers,
  fetchUserById,
} from "../../redux/features/user/user-slice";
import { retryAction } from "../../utils/retry";
import { openModal } from "../../redux/features/modal/modal-slice";
import UserDetail from "../../components/ui/popups/view-user-detials";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import UserCard from "../../components/user/user-card";
import UserCardSkeleton from "../../components/user/user-card-skeletal";

const CARD_HEIGHT = 310;
const GAP = 16;

const BREAKPOINTS = {
  desktop: 1024,
  tablet: 768,
};

const UserGrid = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());

    const timeout = setTimeout(() => {
      if (loading) setTimedOut(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleRetry = () => {
    setTimedOut(false);
    retryAction(dispatch, fetchUsers);
  };

  const handleCardClick = (id: string) => {
    if (!error) dispatch(fetchUserById(id));
    dispatch(openModal(<UserDetail id={id} />));
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4 w-full h-[90vh]">
      {/* Loading Skeletons */}
      {loading && !timedOut && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error Retry */}
      {timedOut && error && (
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {/* Virtualized User Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="w-full h-full">
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => {
              let columnCount = 1;

              if (width >= BREAKPOINTS.desktop) {
                columnCount = 3;
              } else if (width >= BREAKPOINTS.tablet) {
                columnCount = 2;
              }

              // Calculate total gaps between cards (N-1 gaps for N columns)
              const totalGapWidth = GAP * (columnCount - 1);

              // Calculate card width by subtracting total gaps from width and dividing by columns
              const cardWidth = Math.floor(
                (width - totalGapWidth) / columnCount
              );

              const rowCount = Math.ceil(users.length / columnCount);

              const Cell = ({
                columnIndex,
                rowIndex,
                style,
              }: {
                columnIndex: number;
                rowIndex: number;
                style: React.CSSProperties;
              }) => {
                const index = rowIndex * columnCount + columnIndex;
                if (index >= users.length) return null;

                const user = users[index];

                return (
                  <div
                    style={{
                      ...style,
                      // Offset left and top to add gaps between cards
                      left: (cardWidth + GAP) * columnIndex,
                      top: (CARD_HEIGHT + GAP) * rowIndex,
                      width: cardWidth,
                      height: CARD_HEIGHT,
                    }}
                  >
                    <UserCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      avatar={user.avatar}
                      onClick={() => handleCardClick(user.id)}
                    />
                  </div>
                );
              };

              return (
                <Grid
                  columnCount={columnCount}
                  columnWidth={cardWidth + GAP}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={CARD_HEIGHT + GAP}
                  width={width}
                >
                  {Cell}
                </Grid>
              );
            }}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default UserGrid;
