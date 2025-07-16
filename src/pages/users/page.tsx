// pages/users/UserGrid.tsx
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

// Breakpoints for screen widths
const BREAKPOINTS = {
  desktop: 1024, // Screens >= 1024px => Desktop layout with 3 columns
  tablet: 768, // Screens >= 766px and < 1024px => Tablet layout with 2 columns
  mobile: 0, // Screens < 766px => Mobile layout with 1 column
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
      {loading && !timedOut && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      )}

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

      {!loading && !error && users.length > 0 && (
        <div className="w-full h-full">
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => {
              // Default to 1 column and full width for mobile screens
              let columnCount = 2;
              let cardWidth = width;

              if (width >= BREAKPOINTS.desktop) {
                // Desktop: 3 columns
                columnCount = 3;
                cardWidth = Math.floor(
                  (width - GAP * (columnCount + 1)) / columnCount
                );
              } else if (width >= BREAKPOINTS.tablet) {
                // Tablet: 2 columns with reduced card width
                columnCount = 2;
                // Reduce card width by extra 40px to give more spacing/padding
                cardWidth = 300;
              } else {
                // Mobile: 1 column
                columnCount = 1;
                cardWidth = width - GAP * 2;
              }

              // Calculate total number of rows needed to display all users
              const rowCount = Math.ceil(users.length / columnCount);

              // Cell renderer for each card
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
                      // Add GAP offset so cards don't touch edges or each other
                      left: Number(style.left) + GAP,
                      top: Number(style.top) + GAP,
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
                  // Add GAP to width and height so spacing is respected
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
